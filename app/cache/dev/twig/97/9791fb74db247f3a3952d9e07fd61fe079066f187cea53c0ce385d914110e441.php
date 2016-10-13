<?php

/* @Framework/Form/form_rest.html.php */
class __TwigTemplate_6a968be8cd2509a55ee7c3b230332859028b6cb0a582097d58534894b09afd46 extends Twig_Template
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
        $__internal_93280551c525a3b2c00b9e427fada34eb5f89a071b5af953e5073f014d1381e7 = $this->env->getExtension("native_profiler");
        $__internal_93280551c525a3b2c00b9e427fada34eb5f89a071b5af953e5073f014d1381e7->enter($__internal_93280551c525a3b2c00b9e427fada34eb5f89a071b5af953e5073f014d1381e7_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/Form/form_rest.html.php"));

        // line 1
        echo "<?php foreach (\$form as \$child): ?>
    <?php if (!\$child->isRendered()): ?>
        <?php echo \$view['form']->row(\$child) ?>
    <?php endif; ?>
<?php endforeach; ?>
";
        
        $__internal_93280551c525a3b2c00b9e427fada34eb5f89a071b5af953e5073f014d1381e7->leave($__internal_93280551c525a3b2c00b9e427fada34eb5f89a071b5af953e5073f014d1381e7_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/Form/form_rest.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <?php foreach ($form as $child): ?>*/
/*     <?php if (!$child->isRendered()): ?>*/
/*         <?php echo $view['form']->row($child) ?>*/
/*     <?php endif; ?>*/
/* <?php endforeach; ?>*/
/* */
