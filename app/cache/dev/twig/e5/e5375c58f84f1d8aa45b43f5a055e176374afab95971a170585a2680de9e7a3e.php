<?php

/* @Framework/Form/datetime_widget.html.php */
class __TwigTemplate_2cad670114ac526e439e4304fbbed9aa9b325e1f22bac9a028ae054ca0a06715 extends Twig_Template
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
        $__internal_f44392cc167a165e519934870732e3c95990d5e469b9ebfd164df627d21ede32 = $this->env->getExtension("native_profiler");
        $__internal_f44392cc167a165e519934870732e3c95990d5e469b9ebfd164df627d21ede32->enter($__internal_f44392cc167a165e519934870732e3c95990d5e469b9ebfd164df627d21ede32_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/Form/datetime_widget.html.php"));

        // line 1
        echo "<?php if (\$widget == 'single_text'): ?>
    <?php echo \$view['form']->block(\$form, 'form_widget_simple'); ?>
<?php else: ?>
    <div <?php echo \$view['form']->block(\$form, 'widget_container_attributes') ?>>
        <?php echo \$view['form']->widget(\$form['date']).' '.\$view['form']->widget(\$form['time']) ?>
    </div>
<?php endif ?>
";
        
        $__internal_f44392cc167a165e519934870732e3c95990d5e469b9ebfd164df627d21ede32->leave($__internal_f44392cc167a165e519934870732e3c95990d5e469b9ebfd164df627d21ede32_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/Form/datetime_widget.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <?php if ($widget == 'single_text'): ?>*/
/*     <?php echo $view['form']->block($form, 'form_widget_simple'); ?>*/
/* <?php else: ?>*/
/*     <div <?php echo $view['form']->block($form, 'widget_container_attributes') ?>>*/
/*         <?php echo $view['form']->widget($form['date']).' '.$view['form']->widget($form['time']) ?>*/
/*     </div>*/
/* <?php endif ?>*/
/* */
