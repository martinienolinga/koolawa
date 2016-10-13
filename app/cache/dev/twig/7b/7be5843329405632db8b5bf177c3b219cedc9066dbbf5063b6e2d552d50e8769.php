<?php

/* @Framework/Form/form_widget.html.php */
class __TwigTemplate_815e932ae962147bd933de7223eb9121c75d196cea76014414ac50a44ba29212 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_0ea96d57862e8955527788cf7820551f264f5addb94490c692acbb82582a0795 = $this->env->getExtension("native_profiler");
        $__internal_0ea96d57862e8955527788cf7820551f264f5addb94490c692acbb82582a0795->enter($__internal_0ea96d57862e8955527788cf7820551f264f5addb94490c692acbb82582a0795_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/Form/form_widget.html.php"));

        // line 1
        echo "<?php if (\$compound): ?>
<?php echo \$view['form']->block(\$form, 'form_widget_compound')?>
<?php else: ?>
<?php echo \$view['form']->block(\$form, 'form_widget_simple')?>
<?php endif ?>
";
        
        $__internal_0ea96d57862e8955527788cf7820551f264f5addb94490c692acbb82582a0795->leave($__internal_0ea96d57862e8955527788cf7820551f264f5addb94490c692acbb82582a0795_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/Form/form_widget.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <?php if ($compound): ?>*/
/* <?php echo $view['form']->block($form, 'form_widget_compound')?>*/
/* <?php else: ?>*/
/* <?php echo $view['form']->block($form, 'form_widget_simple')?>*/
/* <?php endif ?>*/
/* */
